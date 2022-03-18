window.app_saku2_transaksi_kopeg_ppbs_fPostOutlook = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_ppbs_fPostOutlook.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_ppbs_fPostOutlook";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load & Posting Data Estimasi: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;portalui_uploader");		
		this.c_tahun = new saiCB(this,{bound:[20,22,180,20],caption:"Tahun Anggaran",readOnly:true,tag:2,change:[this,"doChange"]});					
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.c_periode = new saiCB(this,{bound:[20,12,202,20],caption:"Periode Outlook",readOnly:true}); 
		this.i_Load = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Tampil Data Estimasi",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});				
		
		this.bUpload = new portalui_uploader(this,{bound:[840,12,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,428], childPage:["Ambil Data OutLook","Load Jurnal OutLook"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
				colTitle:["Kode Akun","DC","Nama","Nilai Estimasi","Kode CF"],
				colWidth:[[4,3,2,1,0],[100,100 ,250,80,100]],
				colFormat:[[3],[cfNilai]],
				readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:5,tag:0,
				colTitle:["Kode Akun","DC","Nama","Nilai Estimasi","Kode CF"],
				colWidth:[[4,3,2,1,0],[100,100 ,250,80,100]],
				colFormat:[[3],[cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:2, grid:this.sg1, pager:[this,"selectPage"]});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.sgn.uploader.setParam3("object");
			this.sg1.setAllowBlank(true);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();					
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}			
			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from agg_outlook where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('AKUNKOMA') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "AKUNKOMA") this.akunKoma = line.flag;								
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_ppbs_fPostOutlook.extend(window.childForm);
window.app_saku2_transaksi_kopeg_ppbs_fPostOutlook.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 1000));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 1000;
		var finish = start + 1000;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg1.appendData([line.kode_akun,line.dc,line.nama,floatToNilai(line.estimasi),line.kode_cf]);
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[1]);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POOL"+this.c_tahun.getText()+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					var tahunSeb = parseFloat(this.c_tahun.getText()) - 1;
					var tgl = tahunSeb+'-12-01';	
						
					sql.add("delete from agg_post_m where modul = 'OL' and tahun = '"+tahunSeb+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_gldt where modul = 'OL' and periode = '"+tahunSeb+"12' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into agg_post_m(no_post, kode_lokasi, modul, tgl_input, nik_user, tahun) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','OL',getdate(),'"+this.app._userLog+"','"+tahunSeb+"')");

					var idx=0;
					for (var i=0;i< this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							idx++;
							if (this.sg1.cells(3,i) != "0") {								
								sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cf) values "+
										"('"+this.e_nb.getText()+"',"+idx+",'"+this.app._lokasi+"','OL','-','-','"+tgl+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"',"+nilaiToFloat(this.sg1.cells(3,i))+",'"+this.sg1.cells(2,i)+"','-','"+tahunSeb+'12'+"','-','IDR',1,"+nilaiToFloat(this.sg1.cells(3,i))+",getdate(),'"+this.app._userLog+"','"+this.sg1.cells(4,i)+"')");

							}
						}
					}						
					sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cf) "+
							"select '"+this.e_nb.getText()+"',0,'"+this.app._lokasi+"','OL','KOMA','-','"+tgl+"','"+this.akunKoma+"',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','0','"+tahunSeb+'12'+"','-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),getdate(),'"+this.app._userLog+"','-' "+
							"from agg_gldt where periode like '"+tahunSeb+"%'  and modul ='OL' and kode_lokasi='"+this.app._lokasi+"'");
					
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
					this.sg.clear(1); this.sg1.clear(1);  
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
					this.simpan();
				break;							
		}	
	},		
	doLoad:function(sender){		
		if (this.c_tahun.getText() != "") {						
			this.sg.clear();			
			var data = this.dbLib.getDataProvider("select a.kode_akun,case when b.jenis='Pendapatan' then 'C' else 'D' end as dc,b.nama,sum(a.outlook-a.realisasi) as estimasi "+
			           "from agg_outlook a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					   
					   "where a.periode='"+this.c_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					   "group by a.kode_akun,case when b.jenis='Pendapatan' then 'C' else 'D' end,b.nama",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];				
					this.sg.appendData([line.kode_akun,line.dc.toUpperCase(),line.nama,floatToNilai(line.estimasi),'-']);
				}
			} 			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POOL"+this.c_tahun.getText()+".",'000'));
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();						
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1);  
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});