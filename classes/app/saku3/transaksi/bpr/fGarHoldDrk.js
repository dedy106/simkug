window.app_saku3_transaksi_bpr_fGarHoldDrk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fGarHoldDrk.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_bpr_fGarHoldDrk";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Holding Anggaran", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		 
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});					
		this.e_total = new saiLabelEdit(this,{bound:[770,13,220,20],caption:"Total Hold", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[5,12,990,400], childPage:["Filter Data","Data Budget"]});
		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"PP / Unit", multiSelection:false, maxLength:10, tag:9});
		this.cb_gar = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,220,20],caption:"Mata Anggaran", multiSelection:false, maxLength:10, tag:9});
		this.cb_drk = new saiCBBL(this.pc1.childPage[0],{bound:[20,19,220,20],caption:"DRK", multiSelection:false, maxLength:10, tag:9});		
		this.e_tahun = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,readOnly:true,change:[this,"doChange"]});				
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Tri Wulan",items:["TW1","TW2","TW3","TW4"], readOnly:true,tag:2,change:[this,"doChange"]});				
		//this.c_bulan1 = new saiCB(this.pc1.childPage[0],{bound:[20,11,150,20],caption:"Dr - Sd Bulan",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:9});
		//this.c_bulan2 = new saiCB(this.pc1.childPage[0],{bound:[175,11,50,20],caption:"",items:["01","02","03","04","05","06","07","08","09","10","11","12"], labelWidth:0,readOnly:true,tag:9});
		this.c_bulan1 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,145,20],caption:"Dr - Sd Bulan", readOnly:true,tag:9});
		this.c_bulan2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[170,11,50,20],caption:"", labelWidth:0,readOnly:true,tag:9});

		this.e_persen = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"% Hold", tag:9, tipeText:ttNilai, text:"100"});		
		this.bTampil = new portalui_button(this.pc1.childPage[0],{bound:[120,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:0,
		            colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Kode DRK","Nama DRK","Periode","Sisa Budget","Nilai Release"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,  80,200,80,200,80,250,80]],
					colFormat:[[5,6],[cfNilai,cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],										
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		this.setTabChildIndex();		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

		this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		this.cb_gar.setSQL("select kode_gar, nama from masgar where status_gar='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_gar","nama"],false,["Kode","Nama"],"and","Data MTA",true);
		this.cb_drk.setSQL("select kode_drk, nama from drk where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);

		this.dataJU = {rs:{rows:[]}};

		this.c_jenis.setText("TW1");
		setTipeButton(tbSimpan);						
	}
};
window.app_saku3_transaksi_bpr_fGarHoldDrk.extend(window.portalui_childForm);
window.app_saku3_transaksi_bpr_fGarHoldDrk.implement({	
	doTampilClick: function() {
		var perAwal = this.e_tahun.getText()+this.c_bulan1.getText();
		var perAkhir = this.e_tahun.getText()+this.c_bulan2.getText();
		var persen = nilaiToFloat(this.e_persen.getText()) / 100;
		
		var filter = "";
		if (this.cb_pp.getText() == "") filter = " ";
		else filter = " and a.kode_pp = '"+this.cb_pp.getText()+"' ";

		if (this.cb_gar.getText() == "") filter = filter + " ";
		else filter = filter + " and a.kode_gar = '"+this.cb_gar.getText()+"' ";

		var strSQL = "select a.*, "+
					"round(a.sisa_gar * "+persen+",0) as nilai "+
					"from "+
					"( "+
					
					"select a.kode_lokasi, "+
					"c.kode_gar,c.nama as nama_gar, "+
					"a.kode_pp,d.nama as nama_pp, "+
					"a.kode_drk,f.nama as nama_drk, "+
					"a.periode1, "+
					"sum(case dc when 'D' then a.nilai else -a.nilai end) as sisa_gar "+
					"from angg_r a "+
					"inner join masgar c on a.kode_gar=c.kode_gar and a.kode_lokasi=c.kode_lokasi "+
					"inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
					"inner join drk f on a.kode_drk=f.kode_drk and a.kode_lokasi=d.kode_lokasi "+					
					"where a.periode1 between '"+perAwal+"' and '"+perAkhir+"'  and a.kode_lokasi='"+this.app._lokasi+"' "+
					"group by "+
					"a.kode_lokasi,c.kode_gar,c.nama,a.kode_pp,d.nama,a.periode1,a.kode_drk,f.nama "+

					") a "+

					"where a.kode_lokasi='"+this.app._lokasi+"' "+filter;   

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_gar,line.nama_gar, line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk, line.periode1, floatToNilai(line.sisa_gar), floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
					this.doClick(this.i_gen);
					this.dataJU = {rs:{rows:[]}};
					this.e_total.setText("0");
					this.pc1.setActivePage(this.pc1.childPage[0]);
				} else setTipeButton(tbSimpan);				
				break;
			case "simpan" :									
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (parseFloat(line.nilai) > parseFloat(line.sisa_gar)){
							system.alert(this,"Data tidak valid.","Hold melebihi Sisa Anggaran.(MTA : "+line.kode_gar+")");
							return false;	
						}
					}
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"angg_release_m","no_bukti",this.app._lokasi+"-HLD"+this.e_tahun.getText().substr(2,2)+".","0000"));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();		
							
							sql.add("insert into angg_release_m (no_bukti,kode_lokasi,tgl_input,nik_user,tahun,modul,tanggal,keterangan,nilai) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.e_tahun.getText()+"','HOLD','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_total.getText())+")");
							
							for (var i=0;i < this.dataJU.rs.rows.length;i++){
								line = this.dataJU.rs.rows[i];
								if (parseFloat(line.nilai) != 0){
									sql.add("insert into angg_release_d(no_bukti,kode_lokasi,kode_gar,kode_pp,kode_drk,periode,dc,nilai) values "+
											"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_gar+"','"+line.kode_pp+"','"+line.kode_drk+"','"+line.periode1+"','C',"+parseFloat(line.nilai)+")");									
								}
							}	

							sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_gar,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai,gar_thn,gar_tw,gar_bulan,no_ref,param1,param2) "+
									"select "+
									"no_bukti,'HOLD',kode_lokasi,kode_gar,kode_pp,kode_drk,periode,periode,dc,0,sum(nilai),0,0,0,'-','-','-' "+
									"from angg_release_d  "+									
									"where no_bukti='"+this.e_nb.getText()+"' "+
									"group by no_bukti,kode_lokasi,kode_gar,kode_pp,kode_drk,periode,dc");

							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_tahun.setText(y);
		this.doClick(this.i_gen);
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"angg_release_m","no_bukti",this.app._lokasi+"-HLDD"+this.e_tahun.getText().substr(2,2)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);				
		}
		if (sender == this.bRefresh) this.sg.clear(1);
	},
	doChange: function(sender){
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {
			if (this.c_jenis.getText() == "TW1") {
				this.c_bulan1.setText("01");
				this.c_bulan2.setText("03");
			}
			if (this.c_jenis.getText() == "TW2") {
				this.c_bulan1.setText("04");
				this.c_bulan2.setText("06");
			}
			if (this.c_jenis.getText() == "TW3") {
				this.c_bulan1.setText("07");
				this.c_bulan2.setText("09");
			}
			if (this.c_jenis.getText() == "TW4") {
				this.c_bulan1.setText("10");
				this.c_bulan2.setText("12");
			}
		}
	},
	doChangeCell: function(sender, col , row) {
		if (col == 6) {
			this.dataJU.rs.rows[((this.page-1)*this.app._pageRow) + row].nilai = nilaiToFloat(this.sg.cells(6,row));
			this.doNilaiChange();
		}
	},			
	doNilaiChange: function(){
		try{
			var tot = 0;
			var line;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				if (line.nilai != ""){
					tot += parseFloat(line.nilai);
				}
			}	
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;				
			}
		}		
	}
});
