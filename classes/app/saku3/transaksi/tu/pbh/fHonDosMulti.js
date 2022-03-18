window.app_saku3_transaksi_tu_pbh_fHonDosMulti = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_pbh_fHonDosMulti.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_pbh_fHonDosMulti";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan Beban Honor Dosen [Multi]", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]}); 

		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Agenda","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,400,80,100]],
					colFormat:[[3],[cfNilai]],												
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data by PP",click:[this,"doLoad3"]});				
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Kode Transaksi",items:["UMUM"], readOnly:true,tag:2, visible:false});
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:true});		
		this.cb_app = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"NIK Approve",tag:1,multiSelection:false});         				
		this.cb_akun = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"MTA",tag:2,multiSelection:false,change:[this,"doChange"]});         		
		this.c_bayar = new saiCB(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Jenis Bayar",items:["TRANSFER","TUNAI",], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,450,20],caption:"Uraian", maxLength:150});				
		this.e_bruto = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Bruto", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_user = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"User input", maxLength:50});								
		this.e_netto = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,17,200,20],caption:"Netto", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,258], childPage:["Detail Honor","Error Dosen","Kontrol Budget"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:12,tag:0,
				colTitle:["Kd Dosen","Bruto","Pot. Pajak","Netto","Nama Dosen","NPWP","Kode PP","Kode DRK","Bank","Cabang","No Rekening","Penerima"],
				colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[150,100,100,100, 80,80,150,150, 80,80,80,80]],
				readOnly:true,
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],												
				afterPaste:[this,"doAfterPaste"],
				pasteEnable:true,autoPaging:true,rowPerPage:200,
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPage1"]});
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,5,300,250],labelWidth:0,tag:9});
		this.e_memo.setReadOnly(true);

		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:6,tag:9,
					colTitle:["Kode MTA","Kode PP","Kode DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],
					readOnly:true,colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
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
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+								
								"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);													
			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Karyawan",true);					

			this.e_user.setText(this.app._namaUser);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_pbh_fHonDosMulti.extend(window.childForm);
window.app_saku3_transaksi_tu_pbh_fHonDosMulti.implement({	
	doAfterPaste: function(sender,totalRow){
		try {						
			var totBruto = totNetto = 0;			
			var err = 0;
			var msg  = ""; this.e_memo.setText("");
			for (var i=0;i < this.sg1.getRowCount();i++){			
				if (this.sg1.rowValid(i)){
					var data = this.dbLib.getDataProvider("select nama,bank,cabang,no_rek,nama_rek,npwp from it_dosen where kode_dosen='"+this.sg1.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined) {

							var strSQL2 = "select (case when '"+line.npwp+"' <> '0' then nilai_seb else nilai_seb2 end) + ( (case when '"+line.npwp+"' <> '0' then persen/100 else persen2/100 end) * (("+nilaiToFloat(this.sg1.cells(1,i))+"*0.5)-kurang_seb)) as nilai_pph "+
										  "from pjk_pph21 where ("+nilaiToFloat(this.sg1.cells(1,i))+" * 0.5) between bawah and atas and kode_lokasi ='"+this.app._lokasi+"' and jenis ='PROGRESIF'";						   				
	  
							var data2 = this.dbLib.getDataProvider(strSQL2,true);
							if (typeof data2 == "object"){
								var line2 = data2.rs.rows[0];							
								if (line2 != undefined){						
									this.sg1.cells(2,i,Math.round(line2.nilai_pph));																					
								}					
							}
							var neto = nilaiToFloat(this.sg1.cells(1,i)) - nilaiToFloat(this.sg1.cells(2,i));
							this.sg1.cells(3,i,neto);
						
							var strSQL2 = "select top 1 kode_pp,bank,cabang,no_rek,nama_rek "+
										  "from sp_unit where kode_pp ='"+this.sg1.cells(6,i)+"' and kode_lokasi ='"+this.app._lokasi+"' ";						   															  
							var data2 = this.dbLib.getDataProvider(strSQL2,true);
							if (typeof data2 == "object"){
								var line2 = data2.rs.rows[0];							
								if (line2 != undefined){			
									if (this.c_bayar.getText() == "TUNAI") {	
										//rekening pakai punya pp		
										this.sg1.cells(8,i,line2.bank);
										this.sg1.cells(9,i,line2.cabang);
										this.sg1.cells(10,i,line2.no_rek);
										this.sg1.cells(11,i,line2.nama_rek);
									}
									else {
										//TRANSFER rekening pakai punya dosen
										this.sg1.cells(8,i,line.bank);
										this.sg1.cells(9,i,line.cabang);
										this.sg1.cells(10,i,line.no_rek);
										this.sg1.cells(11,i,line.nama_rek);
									}
								}	
								else {
									//pp tidak ditemukan
									err = 1;
									msg+= this.sg1.cells(6,i)+"\n";											

									this.sg1.cells(6,i,"-");
									this.sg1.cells(8,i,"-");
									this.sg1.cells(9,i,"-");
									this.sg1.cells(10,i,"-");
									this.sg1.cells(11,i,"-");
								}				
							}

							var strSQL2 = "select kode_drk "+
										  "from drk where kode_drk ='"+this.sg1.cells(7,i)+"' and kode_lokasi ='"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"'";						   															  
							var data2 = this.dbLib.getDataProvider(strSQL2,true);
							if (typeof data2 == "object"){
								var line2 = data2.rs.rows[0];							
								if (line2 == undefined){			
									err = 1;
									msg+= this.sg1.cells(7,i)+"\n";											
									this.sg1.cells(7,i,"-");									
								}													
							}

							this.sg1.cells(4,i,line.nama);
							this.sg1.cells(5,i,line.npwp);

							totBruto += nilaiToFloat(this.sg1.cells(1,i));
							totNetto += nilaiToFloat(this.sg1.cells(3,i));
						}
						else {							
							err = 1;
							msg+= this.sg1.cells(0,i)+"\n";											
						}
					}				
				}
			}
			this.e_memo.setText(msg);			
			
			if (err == 1) {			
				var j = i+1;
				system.alert(this,"Data Dosen tidak valid.","Lihat Tab Error.");
				this.sg1.clear(1);
				this.e_bruto.setText("0");
				this.e_netto.setText("0");			
				return false;
			}
			else {
				this.doHitungGar();
			}
			this.e_bruto.setText(floatToNilai(totBruto));
			this.e_netto.setText(floatToNilai(totNetto));			
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage1: function(sender,page){
		this.sg1.doSelectPage(page);
	},
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i)){
				nilai = nilaiToFloat(this.sg1.cells(1,i));
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.cb_akun.getText() == this.sg2.cells(0,j) && this.sg1.cells(6,i) == this.sg2.cells(1,j) && this.sg1.cells(7,i) == this.sg2.cells(2,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.cb_akun.getText(),this.sg1.cells(6,i),this.sg1.cells(7,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(4,idx));
					total = total + nilai;
					this.sg2.setCell(4,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan==1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"') as gar ",true);			
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(1,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);			

			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(3,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(4,i));
				this.sg2.cells(5,i,floatToNilai(sls));
			}
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("delete from it_aju_multi where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
						sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
						sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");																
					}
					
					var vPajak = nilaiToFloat(this.e_bruto.getText()) - nilaiToFloat(this.e_netto.getText());
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_kpa,no_app,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,nik_app,jenis_bayar) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_jenis.getText()+"','"+this.cb_akun.getText()+"','"+this.app._kodePP+"','-','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_netto.getText())+",getdate(),'"+this.app._userLog+"','-','-','-','-','-','0','-','-','"+this.e_user.getText()+"','HONDOSM','P21',"+vPajak+",'"+this.cb_app.getText()+"','"+this.c_bayar.getText()+"')");					
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								
								if (this.sg1.cells(5,i) == "0") var kodePajak = "1B"; else var kodePajak = "1A"; 								
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,cabang,no_rek,nama_rek,berita,keterangan,nilai,pajak,kode_pajak,npwp,kode_pp,kode_drk) values "+
								        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(8,i)+"','"+this.sg1.cells(9,i)+"','"+this.sg1.cells(10,i)+"','"+this.sg1.cells(11,i)+"','"+this.sg1.cells(4,i)+"','"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(3,i))+","+nilaiToFloat(this.sg1.cells(2,i))+",'"+kodePajak+"','"+this.sg1.cells(5,i)+"',   '"+this.sg1.cells(6,i)+"','"+this.sg1.cells(7,i)+"')");
							}
						}
					}		
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(4,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(4,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(4,i)) * -1;
								}
              
								sql.add("insert into it_aju_multi(no_aju,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis) values "+
										"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.e_periode.getText()+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','D','"+this.e_ket.getText()+"',"+nilai+",'BEBAN')");
										
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','ITKBAJUDRK','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(2,i)+"','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(3,i))+","+nilai+")");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
					setTipeButton(tbSimpan);
					this.sg1.clear(1);
					this.sg3.clear(1);
				break;
			case "simpan" :									
			case "ubah" :					
				var data = this.dbLib.getDataProvider("select status_gar from masakun where kode_akun='"+this.cb_akun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.stsGar = line.status_gar;
					} 
				}				
				if (this.stsGar == "1") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(4,i))>0 && nilaiToFloat(this.sg2.cells(3,i)) < nilaiToFloat(this.sg2.cells(4,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;													
						}
					}
				}

				if (nilaiToFloat(this.e_netto.getText()) <= 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from it_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
				sql.add("delete from it_aju_multi where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																
				sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='ITKBAJUDRK'");				
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;		
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1);				
			this.sg3.clear(1); 
		}
		this.stsSimpan = 1;			
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_aju_m","no_aju",this.app._lokasi+"-"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_app.setFocus();
		setTipeButton(tbSimpan);
	},	
	doChange:function(sender){			
		if (sender == this.c_bayar && this.c_bayar.getText()=="TUNAI") {
			this.sg1.clear(1);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku3_tu_pajak_rptHonorFormNP";
							this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
							this.filter2 = this.e_periode.getText()+"/";
							this.viewer.prepare();
							this.viewer.setVisible(true);
							this.app._mainForm.pButton.setVisible(false);
							this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
							this.page = 1;
							this.allBtn = false;															 
							this.pc2.hide();
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc2.show();
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);						
			setTipeButton(tbSimpan);
			this.sg1.clear(1);this.sg3.clear(1);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																
		var strSQL = "select no_aju, convert(varchar,tanggal,103) as tgl, keterangan, nilai "+
					 "from it_aju_m "+
					 "where kode_pp='"+this.app._kodePP+"' and form = 'HONDOSM' and modul='UMUM' and progress in ('A','K','R') and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_aju,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var data = this.dbLib.getDataProvider(
						   "select a.nik_app,a.progress,a.modul,a.tanggal,a.periode,a.keterangan,a.nilai,a.kode_akun,isnull(x.no_kpa,'-') as no_ver,isnull(x.catatan,'-') as catatan, "+
						   "a.user_input,a.sts_pajak,a.npajak,isnull(c.no_gambar,'') as no_gambar,a.jenis_bayar   "+
						   
						   "from it_aju_m a "+
						 
						   "left join (select a.no_kpa,a.no_bukti,a.kode_lokasi,a.catatan "+
						   "          from kpa_d a inner join kpa_m b on a.no_kpa=b.no_kpa and a.kode_lokasi=b.kode_lokasi "+
						   "          where b.no_kpaseb='-' and b.kode_lokasi='"+this.app._lokasi+"' "+
						   "		  ) x on a.no_aju=x.no_bukti and a.kode_lokasi=x.kode_lokasi "+					   

						   "left join it_aju_dok c on a.no_aju=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+					   

						   "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.perLama = line.periode;
						this.dp_d1.setText(line.tanggal);
						this.c_jenis.setText(line.modul);
						this.cb_akun.setText(line.kode_akun);
						this.cb_app.setText(line.nik_app);						
						this.e_ket.setText(line.keterangan);						
						this.c_bayar.setText(line.jenis_bayar);
					} 
				}				

																
				var strSQL = "select b.kode_dosen,a.nilai+a.pajak as bruto,a.pajak,a.nilai,b.nama as nama_dosen,a.npwp,a.kode_pp,a.kode_drk,a.bank,a.cabang,a.no_rek,a.nama_rek "+
				             "from it_aju_rek a inner join it_dosen b on a.keterangan=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"'";		
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						this.sg1.appendData([line.kode_dosen,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai),line.nama_dosen,line.npwp,line.kode_pp,line.kode_drk,line.bank,line.cabang,line.no_rek,line.nama_rek]);
					}
				} else this.sg1.clear(1);											
				

				var totBruto = totNetto = 0;			
				for (var i=0;i < this.sg1.getRowCount();i++){			
					if (this.sg1.rowValid(i)){
						totBruto += nilaiToFloat(this.sg1.cells(1,i));
						totNetto += nilaiToFloat(this.sg1.cells(3,i));										
					}
				}
				this.e_bruto.setText(floatToNilai(totBruto));
				this.e_netto.setText(floatToNilai(totNetto));			
			}						
		} catch(e) {alert(e);}
	}
	
});