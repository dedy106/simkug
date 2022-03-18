window.app_saku3_transaksi_tu_kantin_fRekonTenan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kantin_fRekonTenan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kantin_fRekonTenan";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rekon Tenan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible: false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Rekon Tenan","List Rekon Tenan"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["No Rekon","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,300,100,100]],						
					readOnly:true,
					colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Closing",click:[this,"doLoad3"]});				
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No Rekon", maxLength:20, tag:1,readOnly:true, change:[this,"doChange"]});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});											
		this.e_tenan = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,11,200,20],caption:"Total Tenan", maxLength:50, tag:1,tipeText:ttNilai,text:"0",readOnly:true,change:[this,"doChange"]});
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,400,20],caption:"Keterangan", maxLength:100, tag:1});				
		this.e_telu = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,13,200,20],caption:"Total Tel-U", maxLength:50, tag:1,tipeText:ttNilai,text:"0",readOnly:true,change:[this,"doChange"]});
		this.cb_kantin = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Kantin", tag:2, multiSelection:false,change:[this,"doChange"]});
		this.bTampil = new button(this.pc1.childPage[0],{bound:[670,14,80,18],caption:"Tampil Data",click:[this,"doCari"]});					
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,14,200,20],caption:"Total", maxLength:50, tag:1,tipeText:ttNilai,text:"0",readOnly:true,change:[this,"doChange"]});

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,30,995,327], childPage:["Rekap Tenan","Detail"]});			
		this.sg4 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["Kode Tenan","Tenan","Total","% Tenan","Hasil Tenan","Hasil Tel-U"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,250,100]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					readOnly:true,
					colFormat:[[5,4,3,2],[cfNilai,cfNilai,cfNilai,cfNilai]],					
					autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg4});

		this.sg5 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:0,
		            colTitle:["Kode Tenan","Nama Tenan","No Nota","Tanggal","Nilai"],
					colWidth:[[4,3,2,1,0],[100,100,150,300,100]],					
					readOnly:true,
					colFormat:[[4],[cfNilai]],					
					autoAppend:false,defaultRow:1});
		this.sgn5 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg5,pager:[this,"doPager5"]});	
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);

		setTipeButton(tbAllFalse);

		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_kantin.setSQL("select kode_kantin, nama from ktu_kantin where kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);										
		}catch(e){
			systemAPI.alert(e);
		}
		
	}
};
window.app_saku3_transaksi_tu_kantin_fRekonTenan.extend(window.childForm);
window.app_saku3_transaksi_tu_kantin_fRekonTenan.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						//sql.add("delete from ktu_rekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("delete from ktu_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
						sql.add("update ktu_nota_m set no_rekon='-' where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}					
					
					//sql.add("insert into ktu_rekon_m(no_rekon,tanggal,ket,kode_lokasi,kode_kantin,nilai,periode) values "+
					//		"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"','"+this.cb_kantin.getText()+"','"+nilaiToFloat(this.e_total.getText())+"','"+this.e_periode.getText()+"')");
					
					sql.add("insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3, param1,param2,param3) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','AP','REKON','F','-','-','"+this.dp_d1.getDateString()+"','-','"+this.e_ket.getText()+"','IDR',1,"+
							parseNilai(this.e_total.getText())+","+parseNilai(this.e_total.getText())+",0,'-','-','-','-','-','-', '"+this.cb_kantin.getText()+"','-','-')");
					
					for (var i=0;i < this.dataJU5.rs.rows.length;i++){
						var line = this.dataJU5.rs.rows[i];
						sql.add("update ktu_nota_m set no_rekon='"+this.e_nb.getText()+"' where no_bukti='"+line.no_bukti+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}		
				
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							if (this.sg4.rowValid(i)){							
								sql.add("insert into ktu_rekon_d(no_rekon,kode_lokasi,kode_tenan,nilai,persentase,hasil_tenan, hasil_tel,no_kas) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg4.cells(0,i)+"',"+nilaiToFloat(this.sg4.cells(2,i))+",'"+this.sg4.cells(3,i)+"',"+nilaiToFloat(this.sg4.cells(4,i))+","+nilaiToFloat(this.sg4.cells(5,i))+",'-')");								
							}
						}						
					}							
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.akun_titipan+"','D',a.nilai,a.nilai,'Penyelesaian Titipan Nota : '+a.no_bukti,'AP','HUT-R','IDR',1,a.kode_pp,'-','-','-','-','-',a.no_bukti,'-','-' "+
							"from ktu_nota_m a "+
							"where a.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akun_pdpt+"','C',a.nilai,a.nilai,'Pengakuan Pdpt Nota : '+a.no_bukti,'AP','PDPT','IDR',1,a.kode_pp,'-','-','-','-','-',a.no_bukti,'-','-' "+
							"from ktu_nota_m a "+
							"where a.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akun_beban+"','D',a.hasil_tenan,a.hasil_tenan,'Beban Sharing Tenan : '+b.nama,'AP','BBN','IDR',1,b.kode_kantin,'-','-','-','-','-',a.kode_tenan,'-','-' "+
							"from ktu_rekon_d a inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) "+
							"select '"+this.e_nb.getText()+"',a.kode_lokasi,getdate(),'"+this.app._userLog+"','"+this.e_periode.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akun_bymhd+"','C',a.hasil_tenan,a.hasil_tenan,'Hutang atas Sharing Tenan : '+b.nama,'AP','HUT-A','IDR',1,b.kode_kantin,'-','-','-','-','-',a.kode_tenan,'-','-' "+
							"from ktu_rekon_d a inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");

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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbAllFalse);				
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.pc2.setActivePage(this.pc2.childPage[0]);
				this.sg1.clear(1);
				this.sg4.clear(1);
				this.sg5.clear(1);
				this.bTampil.show();
				this.stsSimpan = 1;
				this.doClick();
				this.cb_kantin.setSQL("select kode_kantin, nama from ktu_kantin where kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);
				break;				
			case "simpan" :
			case "ubah" :	
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai total tidak boleh 0 atau kurang.");
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
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from trans_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from trans_j where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					//sql.add("delete from ktu_rekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("delete from ktu_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					sql.add("update ktu_nota_m set no_rekon='-' where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		if (this.stsSimpan == 1) this.doClick();		
	},		
	doClick: function(sender){
		try {
			if (this.stsSimpan == 0) {
				this.sg1.clear(1);
				this.sg4.clear(1);
				this.sg5.clear(1);
				this.bTampil.show();
				this.cb_kantin.setSQL("select kode_kantin, nama from ktu_kantin where kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);
			}		
			setTipeButton(tbSimpan);
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'trans_m','no_bukti',this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".",'0000'));
			this.e_ket.setFocus();
			this.stsSimpan = 1;	
		}
		catch(e) {
			alert(e);
		}			
	},		
	doChange: function(sender){
		try{
			if (sender == this.cb_kantin) {				
				var strSQL = "select akun_titipan,akun_pdpt,akun_beban,akun_bymhd from ktu_kantin where kode_kantin='"+this.cb_kantin.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.akun_titipan = line.akun_titipan;
						this.akun_pdpt = line.akun_pdpt;
						this.akun_bymhd = line.akun_bymhd;
						this.akun_beban = line.akun_beban;						
					}
				}
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCari:function(sender){								
		if (this.cb_kantin.getText() != "") {
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			var strSQL = "select a.kode_tenan, b.nama, b.persentase, isnull(sum(a.nilai),0) as tenan, round(isnull(sum(a.nilai * b.persentase / 100),0),0) as hasil  "+
						 "from ktu_nota_d a "+ 
						 "inner join ktu_nota_m c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+
						 "inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+							
						 "where a.nilai <> 0 and c.no_rekon =  '-' and c.no_ba <> '-' and a.kode_lokasi ='"+this.app._lokasi+"' and b.kode_kantin='"+this.cb_kantin.getText()+"' "+
						 "group by a.kode_tenan, b.nama,b.persentase";		
				 
			var data2 = this.dbLib.getDataProvider(strSQL,true);					
			if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
				var line2;
				this.sg4.clear();
				for (var i in data2.rs.rows){
					line2 = data2.rs.rows[i];							
					this.sg4.appendData([line2.kode_tenan,line2.nama,floatToNilai(line2.tenan),floatToNilai(line2.persentase),floatToNilai(line2.hasil),"0"]);
				}
			} else this.sg4.clear(1);	

			//total tidak per jenis bayar
			var strSQL = "select a.kode_tenan, b.nama, a.no_bukti, c.tanggal, a.nilai  "+
						 "from ktu_nota_d a "+ 
						 "inner join ktu_nota_m c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+
						 "inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi and b.kode_kantin='"+this.cb_kantin.getText()+"' "+							
						 "where c.no_rekon =  '-' and c.no_ba <> '-' and a.kode_lokasi ='"+this.app._lokasi+"' "+
						 "order by a.kode_tenan";	
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU5 = data;
				this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn5.rearrange();
				this.doTampilData5(1);
			} else this.sg5.clear(1);			
		}	
		else system.alert(this,"Kantin harus dipilih.","");				
	},
	doTampilData5: function(page) {
		this.sg5.clear();
		var line2;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU5.rs.rows.length? this.dataJU5.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line2 = this.dataJU5.rs.rows[i];													
			this.sg5.appendData([line2.kode_tenan,line2.nama,line2.no_bukti,line2.tanggal,floatToNilai(line2.nilai)]); 
		}
		this.sg5.setNoUrut(start);
	},
	doPager5: function(sender, page) {
		this.doTampilData5(page);
	},
	doNilaiChange: function(){
		try{	
			totT = totU = 0;				
			for (var i = 0; i < this.sg4.rows.getLength();i++){
				if (this.sg4.rowValid(i) && this.sg4.cells(2,i) != "" && this.sg4.cells(4,i) != ""){
					this.sg4.cells(5,i,floatToNilai(Math.round(nilaiToFloat(this.sg4.cells(2,i)) - nilaiToFloat(this.sg4.cells(4,i)))));	

					totT += nilaiToFloat(this.sg4.cells(4,i));
					totU += nilaiToFloat(this.sg4.cells(5,i));									
				}
			}
			this.e_tenan.setText(floatToNilai(totT));
			this.e_telu.setText(floatToNilai(totU));
			this.e_total.setText(floatToNilai(totT+totU));			
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
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tu_kantin_rptRekon";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								this.pc1.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
				this.pc1.show();   
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
			setTipeButton(tbAllFalse);				
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.sg1.clear(1);
			this.sg4.clear(1);
			this.sg5.clear(1);
			this.bTampil.show();
			this.stsSimpan = 1;			
			this.doClick();
			this.cb_kantin.setSQL("select kode_kantin, nama from ktu_kantin where kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){	
		if (this.cb_kantin.getText() != "") {					
			var strSQL = "select a.no_bukti,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.nilai1 "+
						 "from trans_m a "+
						 "  left join ( "+
						 "      select distinct no_rekon,kode_lokasi from ktu_rekon_d where no_kas<>'-' and kode_lokasi='"+this.app._lokasi+"' "+
						 ") c on a.no_bukti=c.no_rekon and a.kode_lokasi=c.kode_lokasi "+
						 "where c.no_rekon is null and a.kode_lokasi='"+this.app._lokasi+"' and a.param1='"+this.cb_kantin.getText()+"' and a.periode='"+this.e_periode.getText()+"' and a.posted='F' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
		}	
		else system.alert(this,"Kantin tidak valid.","Kantin harus dipilih");
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line4;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line4 = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line4.no_bukti,line4.tanggal,line4.keterangan,floatToNilai(line4.nilai1)]); 							
			}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.pc2.setActivePage(this.pc2.childPage[0]);														
				
				this.bTampil.hide();
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select keterangan,param1 from trans_m where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_ket.setText(line.keterangan);	
						this.cb_kantin.setSQL("select kode_kantin, nama from ktu_kantin where kode_kantin='"+line.param1+"' and  kode_lokasi = '"+this.app._lokasi+"'",["kode_kantin","nama"],false,["Kode","Nama"],"and","Data Kantin",true);
						this.cb_kantin.setText(line.param1);														
					}
				}

				var strSQL ="select a.kode_tenan, b.nama, b.persentase, isnull(sum(a.nilai),0) as tenan, round(isnull(sum(a.nilai * b.persentase / 100),0),0) as hasil  "+
							"from ktu_nota_d a "+ 
							"inner join ktu_nota_m c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+
							"inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+							
							"where c.no_rekon =  '"+this.e_nb.getText()+"' and c.no_ba <> '-' and a.kode_lokasi ='"+this.app._lokasi+"' "+
							"group by a.kode_tenan, b.nama,b.persentase";								 
				var data2 = this.dbLib.getDataProvider(strSQL,true);					
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					var line2;
					this.sg4.clear();
					for (var i in data2.rs.rows){
						line2 = data2.rs.rows[i];							
						this.sg4.appendData([line2.kode_tenan,line2.nama,floatToNilai(line2.tenan),floatToNilai(line2.persentase),floatToNilai(line2.hasil),"0"]);
					}
				} else this.sg4.clear(1);	

				var strSQL = "select a.kode_tenan, b.nama, a.no_bukti, c.tanggal, a.nilai  "+
							"from ktu_nota_d a "+ 
							"inner join ktu_nota_m c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi "+
							"inner join ktu_tenan b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi "+							
							"where c.no_rekon =  '"+this.e_nb.getText()+"' and c.no_ba <> '-' and a.kode_lokasi ='"+this.app._lokasi+"' "+
							"order by a.kode_tenan";	
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU5 = data;
					this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn5.rearrange();
					this.doTampilData5(1);
				} else this.sg5.clear(1);	

			}
		} catch(e) {alert(e);}
	}
});
