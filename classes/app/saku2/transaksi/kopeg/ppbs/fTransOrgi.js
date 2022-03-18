window.app_saku2_transaksi_kopeg_ppbs_fTransOrgi = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_ppbs_fTransOrgi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_ppbs_fTransOrgi";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Transfer PPBS -> Controlling: Input", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_tahun = new saiCB(this,{bound:[20,22,202,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this,{bound:[20,19,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.bUpload = new portalui_uploader(this,{bound:[420,19,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new panel(this,{bound:[20,23,500,354],caption:"Daftar Akun Transport"});							
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:3,tag:0,
		            colTitle:["Kode Akun","Nama Akun","% Release"],
					colWidth:[[2,1,0],[100,150,80]],					
					readOnly : true,					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"selectPage"]});				
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");						
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_ppbs_fTransOrgi.extend(window.childForm);
window.app_saku2_transaksi_kopeg_ppbs_fTransOrgi.implement({	
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg.appendData([line.kode_akun,line.nama_akun,floatToNilai(line.persen)]);
		}
		this.sg.setNoUrut(start);
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from agg_trans_d where kode_lokasi+no_trans in (select kode_lokasi+no_trans from agg_trans_m where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"')");
					sql.add("delete from agg_trans_m where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'");
					sql.add("delete from anggaran_d where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.c_tahun.getText()+"%'");
					sql.add("delete from drk where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.c_tahun.getText()+"'");
					
					sql.add("insert into drk (kode_drk,tahun,kode_lokasi,nama,block,tgl_input,nik_user,tipe,kode_fsrkm,level_spasi,level_lap,sum_header,jenis_akun,kode_induk,rowindex,modul) "+
							"select kode_drk,tahun,kode_lokasi,nama,block,tgl_input,nik_user,tipe,kode_fsrkm,level_spasi,level_lap,sum_header,jenis_akun,kode_induk,rowindex,modul "+
							"from agg_drk where kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.c_tahun.getText()+"'");					 
					sql.add("insert into agg_trans_m(no_trans,kode_lokasi,tahun,tanggal,keterangan,nik_app,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"')");
					
					for (var i=0; i < this.dataUpload.rows.length;i++){
						line = this.dataUpload.rows[i];														
						sql.add("insert into agg_trans_d(no_trans,kode_lokasi,kode_akun,persen) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"',"+parseFloat(line.persen)+")");							
						sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai,buffer,dc,satuan,tgl_input,nik_user,modul,nilai_sat) "+
								"select '"+this.e_nb.getText()+"',kode_lokasi,0,kode_pp,kode_akun,kode_drk,1,periode,sum(round("+parseFloat(line.persen)+" * total/100,0)),sum(total - round("+parseFloat(line.persen)+" * total/100,0)),'D','-',getdate(),'"+this.app._userLog+"','ORGI',sum(total) "+
								"from agg_d where periode like '"+this.c_tahun.getText()+"%' and kode_lokasi = '"+this.app._lokasi+"' and kode_akun='"+line.kode_akun+"' "+
								"group by kode_lokasi,kode_pp,kode_akun,kode_drk,periode");
					}					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.sg.validasi();								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){		
		
	},
	doChange:function(sender){
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_trans_m","no_trans",this.app._lokasi+"-TRANS"+this.c_tahun.getText()+".","000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}				
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (No : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      							
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});