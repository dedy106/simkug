/**
 * @author mr
 */
window.app_budget_transaksi_fEvalAsset = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fEvalAsset.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fEvalAsset";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approval Anggaran Investasi,BP,BPP Aktap: Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBB");			
			this.lblTgl1 = new portalui_label(this, {bound: [20, 32, 101, 20],caption: "Tanggal",underline: true});						
			this.dp_tgl1 = new portalui_datePicker(this, {bound: [120, 32, 90, 18]});				
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});				
			this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			
			this.eTotAsset = new portalui_saiLabelEdit(this,{bound:[720,78,200,20],caption:"Total Investasi",readOnly:true,tipeText:ttNilai,text:"0"});
			this.ed_desc = new portalui_saiLabelEdit(this, {bound: [20, 10, 500, 20],caption: "Deskripsi",maxLength: 150,tag:1});								
			this.eTotBP = new portalui_saiLabelEdit(this,{bound:[720,10,200,20],caption:"Total BP",readOnly:true,tipeText:ttNilai,text:"0"});
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],tipeText:ttAngka,caption:"Tahun Anggaran",maxLength:4,tag:2});
			this.i_viewer = new portalui_imageButton(this,{bound:[200,12,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
			this.eTotBPP = new portalui_saiLabelEdit(this,{bound:[720,12,200,20],caption:"Total BPP",readOnly:true,tipeText:ttNilai,text:"0"});
			
			this.p0 = new portalui_panel(this,{bound: [20, 231, 900, 355],caption: "Daftar Anggaran Investasi dan Biaya Aktiva Tetap"});	    				
			this.sg0 = new portalui_saiGrid(this.p0, {bound: [1, 20, 895, 308],colCount: 10,
					colTitle:["Status","Jenis","Kode Akun","Nama Akun","Periode","Kode BU","Bisnis Unit","Kode RKA","Nama RKA","Nilai"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,120,80,120,80,80,120,100,80,80]],
					colFormat:[[9],[cfNilai]],readOnly:true,defaultRow:1});    			
			this.sgNav0 = new portalui_sgNavigator(this.p0, {bound: [1, 330, 897, 25],grid: this.sg0,border: 0,buttonStyle: 3});		
			
			this.p1 = new portalui_panel(this,{bound: [20, 232, 900, 355],caption: "Daftar Item Anggaran"});	    				
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 895, 308],colCount: 12, tag:9,
					colTitle:["No Aktap","Nama","Tgl Perolehan","Tgl Awl Susut","Kode Akun","Nama Akun","Kode BU","Bisnis Unit","Kode RKA","Nama RKA","Periode","Nilai"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,60,150,80,100,80,120,80,80,80,150,100]],
					colFormat:[[11],[cfNilai]],readOnly:true,defaultRow:1});    								
			this.sgNav = new portalui_sgNavigator(this.p1, {bound: [1, 330, 897, 25],grid: this.sg1,border: 0,buttonStyle: 3});		
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();											
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.sg0.onNilaiChange.set(this, "doNilaiChange");
			this.sg0.onDblClick.set(this,"doDblClick");
			this.sgNav0.onPager.set(this, "doPager");
			this.sgNav.onPager.set(this, "doPager");
			this.ed_period= this.dp_tgl1.getYear().toString()+(this.dp_tgl1.getMonth() < 10 ? "0" : "") +this.dp_tgl1.getMonth();
			this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
			this.baris = this.app._baris;
			this.sg0.clear(1);
			this.sg1.clear(1);
			this.eTahun.setText("2010");
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fEvalAsset.extend(window.portalui_childForm);
window.app_budget_transaksi_fEvalAsset.implement({
	mainButtonClick : function(sender){
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
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","8","9"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg0.clear(1); 
					this.sg1.clear(1); 
				}
				break;
			case "simpan" :				
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_faapp_m','no_app',this.app._lokasi+"-EVFA"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				var sql = new server_util_arrayList();
				sql.add("insert into agg_faapp_m(no_app, kode_lokasi, tanggal, keterangan, tgl_input, nik_user, tahun)"+
						"                values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_desc.getText()+"',now(), '"+this.app._userLog+"','"+this.eTahun.getText()+"')");
				sql.add("update agg_fa_asset set progress='1' where jenis_agg='T' and tahun_agg='"+this.eTahun.getText()+"'" );
				sql.add("update e set e.progress='1' "+
						"from agg_fasusut_d a inner join agg_fasusut_m e on a.no_fasusut=e.no_fasusut and a.kode_lokasi=e.kode_lokasi "+
						"where a.periode like '"+this.eTahun.getText()+"%' and e.tahun='"+this.eTahun.getText()+"' ");
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul) "+
						"       select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai),'"+this.eTahun.getText()+"',a.kode_lokasi+'FA'+'"+this.eTahun.getText()+"','ASSET' "+
					    "		from agg_fa_asset a "+
					    "					   inner join agg_rka b on a.kode_drk=b.kode_rka and a.kode_lokasi=b.kode_lokasi "+
					    "					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.kode_lokasi=c.kode_lokasi "+						
						"		where a.jenis_agg='T' and a.tahun_agg='"+this.eTahun.getText()+"' "+
					    "		group by a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode "+
					    "		union "+
					    "		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.akun_bp,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai),'"+this.eTahun.getText()+"',a.kode_lokasi+'FA'+'"+this.eTahun.getText()+"',a.status "+
					    "		from agg_fasusut_d a inner join agg_fasusut_m e on a.no_fasusut=e.no_fasusut and a.kode_lokasi=e.kode_lokasi "+
					    "					   inner join agg_rka b on a.kode_drk=b.kode_rka and a.kode_lokasi=b.kode_lokasi "+
					    "					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.kode_lokasi=c.kode_lokasi "+						
					    "		where a.periode like '"+this.eTahun.getText()+"%' and e.tahun='"+this.eTahun.getText()+"' and a.status in ('BP','BPP') "+
					    "		group by a.status,a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.akun_bp,a.kode_pp,a.periode ");				
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	genClick: function(sender){
		try{
			if (this.ed_period != ""){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abauapp_m','no_app',this.app._lokasi+"-EVFA"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				this.ed_desc.setFocus();
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doLoadData: function(sender){	
		if (this.eTahun.getText() != "") {
			var data = this.dbLib.getDataProvider("select 'tambah' as status,'investasi' as jenis,a.kode_akun,b.nama as nama_akun,a.periode,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_rka,sum(a.nilai) as nilai "+
			                                      "from agg_fa_asset a inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "					   inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												  "					   inner join agg_rka d on a.kode_drk=d.kode_rka and a.kode_lokasi=d.kode_lokasi "+
			                                      "where a.jenis_agg='T' and a.tahun_agg='"+this.eTahun.getText()+"' "+
												  "group by a.kode_akun,b.nama,a.periode,a.kode_pp,c.nama,a.kode_drk,d.nama "+
												  "union "+
												  "select a.jenis_agg as status,'bp' as jenis,a.akun_bp as kode_akun,b.nama as nama_akun,a.periode,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_rka,sum(a.nilai) as nilai "+
			                                      "from agg_fasusut_d a inner join agg_fasusut_m e on a.no_fasusut=e.no_fasusut and a.kode_lokasi=e.kode_lokasi "+
												  "                     inner join agg_masakun b on a.akun_bp=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "					    inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												  "					    inner join agg_rka d on a.kode_drk=d.kode_rka and a.kode_lokasi=d.kode_lokasi "+
			                                      "where a.periode like '"+this.eTahun.getText()+"%' and e.tahun='"+this.eTahun.getText()+"' and a.status='BP' "+
												  "group by a.jenis_agg,a.akun_bp,b.nama,a.periode,a.kode_pp,c.nama,a.kode_drk,d.nama "+
												  "union "+
												  "select a.jenis_agg as status,'bpp' as jenis,a.akun_bp as kode_akun,b.nama as nama_akun,a.periode,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_rka,sum(a.nilai) as nilai "+
			                                      "from agg_fasusut_d a inner join agg_fasusut_m e on a.no_fasusut=e.no_fasusut and a.kode_lokasi=e.kode_lokasi "+
												  "                     inner join agg_masakun b on a.akun_bp=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												  "					    inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												  "					    inner join agg_rka d on a.kode_drk=d.kode_rka and a.kode_lokasi=d.kode_lokasi "+
			                                      "where a.periode like '"+this.eTahun.getText()+"%' and e.tahun='"+this.eTahun.getText()+"' and a.status='BPP' "+
												  "group by a.jenis_agg,a.akun_bp,b.nama,a.periode,a.kode_pp,c.nama,a.kode_drk,d.nama ",true);			
			this.dataABAU = undefined;
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				this.rowPerPage = 20;
				this.sgNav0.setTotalPage(Math.ceil(data.rs.rows.length / this.rowPerPage));
				this.sgNav0.rearrange();		
				this.sgNav0.activePage = 0;						
				this.dataABAU = data;
				this.doPagerSG0(1);
			} else systemAPI.alert(data);
		}
	},
	doPagerSG0: function(page){
		this.pageSG0 = page;
		var start = (page - 1) * this.rowPerPage;
		var finish = start + this.rowPerPage;
		finish = finish > this.dataABAU.rs.rows.length ? this.dataABAU.rs.rows.length : finish;
		this.sg0.clear();
		var data = this.dataABAU;
		for (var i= start; i < finish;i++){
			line = data.rs.rows[i];					
			this.sg0.appendData([line.status.toUpperCase(),line.jenis.toUpperCase(),line.kode_akun,line.nama_akun,line.periode,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_rka,floatToNilai(line.nilai)]);
		}
		this.sg0.setNoUrut(start);
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period= year.toString()+month;
	},
	doNilaiChange: function(){		
		var tot1 = tot2 = tot3 = 0;
		var line;
		for (var i in this.dataABAU.rs.rows){
			line = this.dataABAU.rs.rows[i];
			if (line.jenis.toUpperCase() == "INVESTASI")
				tot1 += parseFloat(line.nilai);
			if (line.jenis.toUpperCase() == "BP")
				tot2 += parseFloat(line.nilai);
			if (line.jenis.toUpperCase() == "BPP")
				tot3 += parseFloat(line.nilai);
		}
		this.eTotAsset.setText(floatToNilai(tot1));
		this.eTotBP.setText(floatToNilai(tot2));
		this.eTotBPP.setText(floatToNilai(tot3));
	},
	doChangeCell: function(sender, col, row) {		
		if (this.dataABAU){			
			this.dataABAU.rs.rows[(this.pageSG0 - 1) * this.rowPerPage + row].status = sender.cells(0, row);						
		}
		this.sg0.validasi();
	},
	doPager: function(sender, page){
		if (sender == this.sgNav0) this.doPagerSG0(page);
		if (sender == this.sgNav) this.doLoadDetail(page);
	},
	doLoadDetail: function(page){
		this.pageSG1 = page;
		var start = (page - 1) * this.rowPerPage;
		var finish = start + this.rowPerPage;
		finish = finish > this.dataDetail.rs.rows.length ? this.dataDetail.rs.rows.length : finish;
		this.sg1.clear();
		var data = this.dataDetail;
		for (var i= start; i < finish;i++){
			line = data.rs.rows[i];																
			this.sg1.appendData([line.no_fa,line.nama,line.tgl_oleh,line.tgl_susut,line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_rka,line.periode,floatToNilai(line.nilai)]);
		}
		this.sg1.setNoUrut(start);
	},
	doDblClick: function(sender, col , row){
		if (this.sg0.cells(1,row).toUpperCase() == "INVESTASI") {
			var data = this.dbLib.getDataProvider(
												"select a.no_fa,a.nama,convert(varchar,a.tgl_perolehan,103) as tgl_oleh,convert(varchar,a.tgl_susut,103) as tgl_susut,a.kode_akun,b.nama as nama_akun, "+
												"       a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_rka,a.periode,a.nilai "+
												"from agg_fa_asset a inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"                    inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												"                    inner join agg_rka d on a.kode_drk=d.kode_rka and a.kode_lokasi=d.kode_lokasi "+
												"where a.tahun_agg = '"+this.eTahun.getText()+"' and a.jenis_agg= 'T' and a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_akun = '"+this.sg0.cells(2,row)+"' and a.kode_drk='"+this.sg0.cells(7,row)+"' and a.kode_pp='"+this.sg0.cells(5,row)+"' and a.periode='"+this.sg0.cells(4,row)+"' order by a.no_fa",
												true);		
		} 
		else {
			var data = this.dbLib.getDataProvider(
											"select a.no_fa,a.nama,convert(varchar,a.tgl_perolehan,103) as tgl_oleh,convert(varchar,a.tgl_susut,103) as tgl_susut,x.akun_bp as kode_akun,b.nama as nama_akun, "+
											"       x.kode_pp,c.nama as nama_pp,x.kode_drk,d.nama as nama_rka,x.periode,x.nilai "+
											"from agg_fa_asset a inner join agg_fasusut_d x on a.no_fa=x.no_fa and a.kode_lokasi=x.kode_lokasi "+
											"				     inner join agg_masakun b on x.akun_bp=b.kode_akun and x.kode_lokasi=b.kode_lokasi "+
											"                    inner join agg_pp c on x.kode_pp=c.kode_pp and x.kode_lokasi=c.kode_lokasi "+
											"                    inner join agg_rka d on x.kode_drk=d.kode_rka and x.kode_lokasi=d.kode_lokasi "+
											"where a.tahun_agg = '"+this.eTahun.getText()+"' and x.status='"+this.sg0.cells(1,row).toUpperCase()+"' and x.jenis_agg= '"+this.sg0.cells(0,row).toUpperCase()+"' and x.kode_lokasi = '"+this.app._lokasi+"' and x.akun_bp = '"+this.sg0.cells(2,row)+"' and x.kode_drk='"+this.sg0.cells(7,row)+"' and x.kode_pp='"+this.sg0.cells(5,row)+"' and x.periode='"+this.sg0.cells(4,row)+"' order by a.no_fa",
											true);		
		}
		if (typeof data != "string"){
			var line;			
			this.sgNav.setTotalPage(Math.ceil(data.rs.rows.length / 20));
			this.sgNav.rearrange();
			this.dataDetail = data;
			this.doLoadDetail(1);			
		} else alert(data);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
					if (result.toLowerCase().search("error") == -1)					
					{						
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti :("+ this.ed_nb.getText()+")");						
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;	      			
					case "listData" :
						this.sg1.clear(1); 
					break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	}
});
