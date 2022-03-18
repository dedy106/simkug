window.app_saku3_transaksi_cianjur_proyek_fProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_cianjur_proyek_fProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_cianjur_proyek_fProyek";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Proyek", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;saiGrid;sgNavigator");
		this.pc1 = new pageControl(this,{bound:[20,23,1000,450], childPage:["List Proyek","Entry Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
		            colTitle:["Kode","Keterangan","Tgl Mulai","Tgl Selesai","Nilai","Status"],
					colWidth:[[5,4,3,2,1,0],[80,100,80,80,490,100]],
					colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"ID Proyek",maxLength:50,change:[this,"doChange"],readOnly:true});
		this.i_gen2 = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});	
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[400,10,220,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No PKS", maxLength:50, tag:1});	
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Dekripsi", maxLength:150, tag:1});	
		this.cb_cust = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Data Customer", multiSelection:false, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Data PP", multiSelection:false, maxLength:10, tag:2});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,15,100,18],caption:"Tanggal Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,15,98,18],selectDate:[this,"doSelectDate2"]}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[260,15,100,18],caption:"Tanggal Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[360,15,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai",maxLength:50,tag:1,tipeText:ttNilai, text:"0",change:[this,"doChange"]});			
		this.e_persen = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"Persen OR",maxLength:50,tag:1,tipeText:ttNilai, text:"0" });
		this.bPersen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,18,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});	
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[1],{bound:[260,18,200,20],caption:"Nilai OR",maxLength:50,tag:1,tipeText:ttNilai, text:"0"});
		this.bNilai = new portalui_imageButton(this.pc1.childPage[1],{bound:[465,18,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});	
		this.e_nilai_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,200,20],caption:"Nilai PPN",maxLength:50,tag:1,tipeText:ttNilai, text:"0"});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,21,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Status",items:["1. AKTIF","0. CLOSED"], readOnly:true,tag:2});
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Jenis ID Proyek",items:["NONSP","SP"], readOnly:true,tag:2,change:[this,"doChange"]});

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,520,155],colCount:2,tag:9,
					colTitle:["ID Proyek","Deskripsi"],
					colWidth:[[1,0],[350,120]],					
					columnReadOnly:[true,[0,1],[]],
					buttonStyle:[[0],[bsEllips]], 
					ellipsClick:[this,"doEllipsClick"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,520,25],buttonStyle:2,grid:this.sg});		


		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.doLoad();
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_cianjur_proyek_fProyek.extend(window.childForm);
window.app_saku3_transaksi_cianjur_proyek_fProyek.implement({
	doEllipsClick: function(sender, col, row){
		try{		
			if (this.c_jenis.getText()=="SP") {	
				if (sender == this.sg) {
					if (col == 0){
						this.standarLib.showListData(this, "Daftar ID Proyek",sender,undefined, 
								"select kode_proyek,nama from pr_proyek where kode_cust='"+this.cb_cust.getText()+"' and jenis='NONSP' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
								"select count(*) from pr_proyek where kode_cust='"+this.cb_cust.getText()+"' and jenis='NONSP' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",
								["kode_proyek","nama"],"and",["ID Proyek","Deskripsi"],false);				
					}				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doHitung: function(sender) {	
		try{
			if (sender == this.bPersen && this.e_persen.getText()!="" && this.e_nilai.getText()!="") {
				var persen = nilaiToFloat(this.e_persen.getText())/100;
				var nilai_or= nilaiToFloat(this.e_nilai.getText())*persen;
				this.e_nilaior.setText(floatToNilai(nilai_or));
			}
			if (sender == this.bNilai && this.e_nilaior.getText()!="" && this.e_nilai.getText()!="") {
				var persen = nilaiToFloat(this.e_nilaior.getText()) / nilaiToFloat(this.e_nilai.getText());
				this.e_persen.setText(floatToNilai(Math.round(persen * 10000)/100));			
			}
		}
		catch(e) {
			alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("insert into pr_proyek(kode_proyek,kode_lokasi,no_dokumen,nama,kode_cust,kode_pp,nilai,p_or,nilai_or,nilai_ppn,tgl_mulai,tgl_selesai,flag_aktif,jenis,kode_sp) values "+
							"	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_cust.getText()+"','"+this.cb_pp.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_persen.getText())+","+nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_nilai_ppn.getText())+",'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.c_status.getText().substr(0,1)+"','"+this.c_jenis.getText()+"','"+this.cb_kode.getText()+"')");
							
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("update pr_proyek set kode_sp = '"+this.cb_kode.getText()+"' where kode_proyek='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update pr_proyek set no_dokumen='"+this.e_dok.getText()+"',nama='"+this.e_ket.getText()+"',kode_cust='"+this.cb_cust.getText()+"',kode_pp='"+this.cb_pp.getText()+"',nilai="+nilaiToFloat(this.e_nilai.getText())+",p_or="+nilaiToFloat(this.e_persen.getText())+",nilai_or="+nilaiToFloat(this.e_nilaior.getText())+",nilai_ppn="+nilaiToFloat(this.e_nilai_ppn.getText())+",tgl_mulai='"+this.dp_d1.getDateString()+"',tgl_selesai='"+this.dp_d2.getDateString()+"',flag_aktif='"+this.c_status.getText().substr(0,1)+"',jenis='"+this.c_jenis.getText()+"' "+
							"where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("update pr_proyek set kode_sp = kode_proyek where kode_sp='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
								sql.add("update pr_proyek set kode_sp = '"+this.cb_kode.getText()+"' where kode_proyek='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
							}
						}
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from pr_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("update pr_proyek set kode_sp = kode_proyek where kode_sp='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.sg.clear(1);
					this.doLoad();
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :	
				var d = new Date();
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d.strToDate(this.dp_d2.getText());
				if (d1 > d2) {							
					var k = i+1;
					system.alert(this,"Tanggal tidak valid.","Tanggal berangkat harus lebih awal dari tanggal tiba. (Baris: "+k+")");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :
				var d = new Date();
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d.strToDate(this.dp_d2.getText());
				if (d1 > d2) {	
					system.alert(this,"Tanggal tidak valid.","Tanggal berangkat harus lebih awal dari tanggal tiba.");
					return false;
				}	
				else this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
        if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);			
				
		if (this.stsSimpan == 1) this.doClick();					
	},
	doClick:function(sender){
        if (sender == this.i_gen) {
			var ppn = nilaiToFloat(this.e_nilai.getText()) * 0.1;
			this.e_nilai_ppn.setText(floatToNilai(ppn));
			// this.e_ket.setFocus();
		}
		if (sender == this.i_gen2) {
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pr_proyek","kode_proyek",this.app._lokasi+"-PR"+this.e_periode.getText().substr(2,4)+".","000"));
		}
    },
	doChange: function(sender){
		try{
			if (sender == this.c_jenis){
				if (this.c_jenis.getText()=="SP") this.sg.setTag("0");
				else {
					this.sg.setTag("9");
					this.sg.clear(1);
				}
			}
			if (sender== this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select kode_proyek,jenis,no_dokumen,nama,nilai,p_or,kode_pp,kode_cust,nilai_or,nilai_ppn,tgl_mulai,tgl_selesai,flag_aktif from pr_proyek "+
						     "where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_dok.setText(line.no_dokumen);
						this.e_ket.setText(line.nama);						
						this.cb_cust.setText(line.kode_cust);
						this.cb_pp.setText(line.kode_pp);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_persen.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.e_nilai_ppn.setText(floatToNilai(line.nilai_ppn));
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						this.c_jenis.setText(line.jenis);

						if (line.flag_aktif == "1") var status = "1. AKTIF";
						else var status = "0. CLOSED";
						this.c_status.setText(status);
						

						this.sg.clear(); 			
						var strSQL = "select kode_proyek,nama "+
									"from pr_proyek where kode_sp='"+this.cb_kode.getText()+"' and kode_proyek <> '"+this.cb_kode.getText()+"' order by kode_proyek";			
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;					
							for (var i in data.rs.rows){
								line = data.rs.rows[i];													
								this.sg.appendData([line.kode_proyek,line.nama]);						
							}
						} else this.sg.clear(1);
						
						setTipeButton(tbUbahHapus);


						if (this.app._userStatus == "A") {
							this.e_persen.setReadOnly(false);
							this.e_nilaior.setReadOnly(false);
						}
						else {
							this.e_persen.setReadOnly(true);
							this.e_nilaior.setReadOnly(true);
						}	

					}
					else{
						this.e_persen.setReadOnly(false);
						this.e_nilaior.setReadOnly(false);
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Proyek",sender,undefined, 
											  "select kode_proyek, nama from pr_proyek where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_proyek) from pr_proyek where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_proyek","nama"],"and",["Kode","Deskripsi"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select kode_proyek,nama,convert(varchar,tgl_mulai,103) as tgl_mulai,"+
					 "convert(varchar,tgl_selesai,103) as tgl_selesai,nilai,case when flag_aktif='1' then '1. AKTIF' else '0. CLOSED' end as status from pr_proyek "+
					 "where kode_lokasi='"+this.app._lokasi+"' order by kode_proyek desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_proyek,line.nama,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.nilai),line.status.toUpperCase()]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});