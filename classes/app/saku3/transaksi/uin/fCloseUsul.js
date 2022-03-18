window.app_saku3_transaksi_uin_fCloseUsul = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fCloseUsul.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fCloseUsul";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Closing Usulan", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_tahun = new portalui_saiLabelEdit(this,{bound:[20,22,200,20],caption:"Tahun Budget",readOnly:true,tag:2});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,500,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this,{bound:[20,19,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.bHitung = new button(this,{bound:[875,19,80,18],caption:"Load Usulan",click:[this,"doLoad"]});			

		this.pc1 = new pageControl(this,{bound:[20,10,940,350], childPage:["Data Usulan"]});				
		this.sg = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:0,
		            colTitle:["Kd Fak/Unit","Nama Fak/Unit","Alokasi Belanja","Tot Usuln Blanja","Sisa Belanja","Alokasi Pdpt","Tot Usuln Pdpt","Sisa Pdpt"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,200,80]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],										
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});				
		
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
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
							
			var data = this.dbLib.getDataProvider("select a.tahun,isnull(b.no_close,'-') as no_close from uin_tahun a left join uin_close_m b on a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' order by a.tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.c_tahun.setText(line.tahun);	

				if (line.no_close == "-") setTipeButton(tbSimpan);
				else {
					system.alert(this,"Closing Budget sudah dilakukan.","Closing hanya satu kali untuk satu tahun anggaran.");
					setTipeButton(tbAllFalse);
				}
			}

			this.cb_app.setText(this.app._userLog);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fCloseUsul.extend(window.childForm);
window.app_saku3_transaksi_uin_fCloseUsul.implement({	
	doLoad: function() {
		var strSQL = "select a.kode_pp,a.nama,isnull(d.belanja,0) as alokb,isnull(d.pdpt,0) as alokp,isnull(b.belanja,0) as belanja,isnull(c.pdpt,0) as pdpt, isnull(d.belanja,0)-isnull(b.belanja,0) as sisab, isnull(d.pdpt,0)-isnull(c.pdpt,0) as sisap "+
					 "from pp a "+
					
					 "left join ( "+
						"select kode_pp,kode_lokasi,belanja,pdpt "+
						"from uin_alokasi_m "+
						"where tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+						
					") d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+					

					 "left join ( "+
						"select kode_pp,kode_lokasi,sum(total) as belanja "+
						"from uin_usul_d "+
						"where tahun='"+this.c_tahun.getText()+"' and kode_akun like '5%' and kode_lokasi='"+this.app._lokasi+"' "+
						"group by  kode_pp,kode_lokasi "+
					 ") b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					
					 "left join ( "+
						"select kode_pp,kode_lokasi,sum(total) as pdpt "+
						"from uin_usul_d "+
						"where tahun='"+this.c_tahun.getText()+"' and kode_akun like '4%' and kode_lokasi='"+this.app._lokasi+"' "+
						"group by  kode_pp,kode_lokasi "+
						") c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					
					 "where a.kode_lokasi ='"+this.app._lokasi+"' and a.flag_aktif='1'";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.kode_pp,line.nama,floatToNilai(line.alokb),floatToNilai(line.belanja),floatToNilai(line.sisab),floatToNilai(line.alokp),floatToNilai(line.pdpt),floatToNilai(line.sisap)]);
			}
			this.sg.validasi();
		} else this.sg.clear(1);
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
					sql.add("insert into uin_close_m(no_close,kode_lokasi,tahun,tanggal,keterangan,nik_app,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"')");					
					sql.add("update uin_usul_m set no_close='"+this.e_nb.getText()+"', status='ORGI' where no_close='-' and tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
				var data = this.dbLib.getDataProvider("select a.tahun,isnull(b.no_close,'-') as no_close from uin_tahun a left join uin_close_m b on a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' order by a.tahun desc",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					this.c_tahun.setText(line.tahun);		
					if (line.no_close == "-") setTipeButton(tbSimpan);
					else {
						system.alert(this,"Closing Budget sudah dilakukan.","Closing hanya satu kali untuk satu tahun anggaran.");
						setTipeButton(tbAllFalse);
						return false;
					}
				}		
																					
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_close_m","no_close",this.app._lokasi+"-CLS"+this.c_tahun.getText().substr(2,2)+".","00000"));
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