window.app_saku3_transaksi_uin_fKbBelanja = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fKbBelanja.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fKbBelanja";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pencairan Nota", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,470], childPage:["Data Pencairan","Daftar Pencairan"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		             colTitle:["No Bukti","Tanggal","Keterangan","Neto","Pilih"],
					 colWidth:[[4,3,2,1,0],[70,100,300,100,100]],readOnly:true,					 
					 colFormat:[[3,4],[cfNilai,cfButton]],
					 click:[this,"doSgBtnClick1"], colAlign:[[4],[alCenter]],					 
					 dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_rek = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Rekening", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.e_neto = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,17,200,20],caption:"Total Neto", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,344], childPage:["Daftar Nota","Detail Agenda"]});								
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:7,tag:0,
					colTitle:["Status","Fak/Unit","No Nota","Tanggal","Deskripsi","Neto","Detail"],
					colWidth:[[6,5,4,3,2,1,0],[70,100,240,80,100,200,80]],					
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],					
					colFormat:[[5,6],[cfNilai,cfButton]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["CAIR","INPROG"]})]],
					dblClick:[this,"doDoubleClick"], 
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],					
					click:[this,"doSgBtnClick"], colAlign:[[6],[alCenter]],									
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});		

		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:12,tag:9,
					colTitle:["KdTrm","Nama Penerima","Deskripsi","IDitem","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","KdAkun"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,80,80,80,80,60,60,60,60,200,150,70]],					
					colHide:[[0,3],[true,true]],
					readOnly:true,
					colFormat:[[5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;		
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_rek.setSQL("select kode_rek, nama from uin_rek where kode_lokasi='"+this.app._lokasi+"'",["kode_rek","nama"],false,["Kode","Nama"],"and","Data Rekening",true);			

			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('UINPPN','UINPPH') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "UINPPN") this.akunPPN = line.flag;
					if (line.kode_spro == "UINPPH") this.akunPPH = line.flag;
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fKbBelanja.extend(window.childForm);
window.app_saku3_transaksi_uin_fKbBelanja.implement({	
	doLoadNota: function() {		
		var strSQL = "select a.no_nota,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.neto, a.kode_pp+' | '+b.nama as pp "+
					 "from uin_nota_m a "+
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "where a.no_kas='-' and a.kode_lokasi='"+this.app._lokasi+"' and substring(a.periode,1,4) <= '"+this.c_tahun.getText()+"' order by a.kode_pp,a.no_nota";							 											 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];						
				this.sg.appendData(["INPROG",line.pp,line.no_nota,line.tgl,line.keterangan,floatToNilai(line.neto),"Detail"]);
			}					
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);			
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from uin_cair_m where no_cair = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("update uin_nota_m set no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}

					var data = this.dbLib.getDataProvider("select kdakun from uin_rek where kode_rek='"+this.cb_rek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){			
							this.kdAkun = line.kdakun;
						} 
					}

					sql.add("insert into uin_cair_m (no_cair,kode_lokasi,tanggal,periode,nik_user,tgl_input,keterangan,neto,kode_rek) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_neto.getText())+",'"+this.cb_rek.getText()+"')");

					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periode+"','KB','KBBLJ','F','-','-','"+this.app._kodePP+"','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_neto.getText())+",0,0,'"+this.app._userLog+"','-','-','-','-','-','"+this.cb_rek.getText()+"','-','-')");

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "CAIR") {
								sql.add("update uin_nota_m set no_kas='"+this.e_nb.getText()+"' where no_nota='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");

								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
										"select  '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.periode+"','"+this.sg.cells(2,i)+"','"+this.dp_d1.getDateString()+"',"+i+",a.kode_akun,'D',sum(a.total),sum(a.total),b.keterangan,'KBBLJ','BBN','IDR',1,b.kode_pp,'-','-','-','-','-','-','-','-' "+
										"from uin_aju_d a inner join uin_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
										"where b.no_nota='"+this.sg.cells(2,i)+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.total <> 0  "+
										"group by a.kode_lokasi,a.kode_akun,b.kode_pp,b.keterangan");

								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
										"select  '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.periode+"','"+this.sg.cells(2,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.akunPPN+"','D',sum(a.ppn),sum(a.ppn),b.keterangan,'KBBLJ','PPN','IDR',1,b.kode_pp,'-','-','-','-','-','-','-','-' "+
										"from uin_aju_d a inner join uin_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
										"where b.no_nota='"+this.sg.cells(2,i)+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.ppn <> 0 "+
										"group by a.kode_lokasi,b.kode_pp,b.keterangan");	
										
								sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
										"select  '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.periode+"','"+this.sg.cells(2,i)+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.akunPPH+"','C',sum(a.pph),sum(a.pph),b.keterangan,'KBBLJ','PPH','IDR',1,b.kode_pp,'-','-','-','-','-','-','-','-' "+
										"from uin_aju_d a inner join uin_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
										"where b.no_nota='"+this.sg.cells(2,i)+"' and b.kode_lokasi='"+this.app._lokasi+"' and a.pph <> 0 "+
										"group by a.kode_lokasi,b.kode_pp,b.keterangan");	
							}
						}
					}

					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.periode+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.kdAkun+"','C',"+parseNilai(this.e_neto.getText())+","+
							parseNilai(this.e_neto.getText())+",'"+this.e_ket.getText()+"','KBBLJ','KB','IDR',1,'"+this.app._kodePP+"','-','-','-','-','-','-','-','-')");
							
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
					sql.add("delete from uin_cair_m where no_cair = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("update uin_nota_m set no_kas='-' where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg3.clear(1);
					setTipeButton(tbAllFalse);	
					this.doLoadNota();	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :
				this.sg.validasi();	
				var ketemu = false;
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i) == "CAIR") {
							ketemu = true;
						}
					}
				}			
				if (!ketemu) {
					system.alert(this,"Transaksi tidak valid.","Tidak ada rekap pengajuan yang berstatus 'CAIR'.");
					return false;
				} 
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.c_tahun.setText(y);
		this.periode = (y+""+m);		
		
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);			
			this.doLoadNota();	
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1); 				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"trans_m","no_bukti",this.app._lokasi+"-BK"+this.c_tahun.getText().substr(2,2)+".","00000"));			
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},			
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 6) {
				var strSQL = "select a.*,c.nama as atensi, a.total-a.ppn-a.pph as neto,a.idbukti+cast(a.nu as varchar) as iditem "+
							 "from uin_aju_d a inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
							 "				   inner join uin_aju_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi "+
							 "where d.no_nota = '"+this.sg.cells(2,row)+"' and d.kode_lokasi='"+this.app._lokasi+"' order by a.nu";							 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg3.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg3.appendData([line.kode_atensi,line.atensi,line.keterangan,line.iditem,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto),line.kode_akun]);
					}					
				} else this.sg3.clear(1);
				this.pc2.setActivePage(this.pc2.childPage[1]);		
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "INPROG") this.sg.cells(0,row,"CAIR");
		else this.sg.cells(0,row,"INPROG");
	},
	doChangeCell: function(sender, col, row){
		if (col == 0) this.sg.validasi();
	},
	doNilaiChange: function(){
		try{
			var neto=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(5,i) != "" && this.sg.cells(0,i)=="CAIR"){					
					neto += nilaiToFloat(this.sg.cells(5,i));						
				}
			}
			this.e_neto.setText(floatToNilai(neto));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doLoad:function(sender){	
		try{					
			var strSQL = "select a.no_cair,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.neto "+
						 "from uin_cair_m a "+						
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' order by a.no_cair desc";							 												 						 
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);						
		}
		catch(e) {
			alert(e);
		}
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_cair,line.tgl,line.keterangan,floatToNilai(line.neto),"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick1(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.e_nb.setText(this.sg1.cells(0,row));	
														
				var data = this.dbLib.getDataProvider("select * from uin_cair_m where no_cair='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.cb_rek.setText(line.kode_rek);
					} 
				}			
				
				var strSQL = "select a.no_nota,convert(varchar,a.tanggal,103) as tgl,a.keterangan, a.neto, a.kode_pp+' | '+b.nama as pp "+
							 "from uin_nota_m a "+
							 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_kas='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp,a.no_nota";							 											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];						
						this.sg.appendData(["CAIR",line.pp,line.no_nota,line.tgl,line.keterangan,floatToNilai(line.neto),"Detail"]);
					}					
				} else this.sg.clear(1);				
				
			}
		} catch(e) {alert(e);}
	}	
});